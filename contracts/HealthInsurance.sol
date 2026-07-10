// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HealthInsurance {

    // Define the different roles in our system
    enum Role { NONE, Patient, Hospital, Clinic, Pharmacy, InsuranceCompany }
    // A struct (short for structure) is a custom data type that allows you to
    // group several variables

    // Structs to hold data for our actors and plans
    struct Actor {
        string name;
        Role role;
        address actorAddress;
    }

    struct Plan {
        uint planId;
        string planName;
        address companyAddress; // Address of the insurance company
        uint coverageLimit; // The total value of the plan
        mapping(string => bool) coveredServices; // Maps a service/medicine name to its coverage status
        mapping(address => bool) excludedProviders; 
    }

    struct PatientEnrollment {
        uint planId;
        uint currentBalance;
        bool isEnrolled;
    }

    // State Variables: Data stored on the blockchain
    mapping(address => Actor) public actors;
    mapping(uint => Plan) public plans;
    mapping(address => PatientEnrollment) public patientEnrollments;
    mapping(address => uint[]) public plansByCompany;
    address[] public registeredActorAddresses;


    // A list of predefined medical services the insurance company can choose from
    string[] public predefinedServices = [
        "General Checkup", "Dental Cleaning", "X-Ray", "Blood Test",
        "Paracetamol", "Amoxicillin", "Ibuprofen", "Cardiology Consultation"
    ];
    // Mapping to store the cost of each service
    mapping(string => uint) public serviceCosts;

    uint private nextPlanId = 1;

    // Events to notify the frontend about important actions
    event ActorRegistered(address indexed actorAddress, string name, Role role);
    event PlanCreated(uint indexed planId, string planName, address indexed companyAddress);
    event PatientEnrolled(address indexed patientAddress, uint indexed planId);
    event ServiceProvided(address indexed patientAddress, address indexed providerAddress, string serviceName, uint cost);
    event ItemsProcessed(
    address indexed patientAddress,
    address indexed providerAddress,
    uint totalCost,
    string[] coveredItems,
    string[] uncoveredItems
    
    );
    // Modifier to restrict access to functions based on role
    modifier onlyRole(Role _role) {
        require(actors[msg.sender].role == _role, "Caller does not have the required role");
        _;
    }

    // Constructor to set up initial service costs
    constructor() {
        serviceCosts["General Checkup"] = 50;
        serviceCosts["Dental Cleaning"] = 80;
        serviceCosts["X-Ray"] = 150;
        serviceCosts["Blood Test"] = 70;
        serviceCosts["Paracetamol"] = 5;
        serviceCosts["Amoxicillin"] = 15;
        serviceCosts["Ibuprofen"] = 8;
        serviceCosts["Cardiology Consultation"] = 250;
    }

    // --- Registration Functions ---
    function register(string memory _name, Role _role) public {
        require(actors[msg.sender].role == Role.NONE, "Address already registered");
        actors[msg.sender] = Actor(_name, _role, msg.sender);

        // **** ADD THIS LINE ****
        registeredActorAddresses.push(msg.sender);

        emit ActorRegistered(msg.sender, _name, _role);
    }

    // --- Insurance Company Functions ---
    function createPlan(
    string memory _planName,
    uint _coverageLimit,
    string[] memory _servicesToCover,
    address[] memory _excludedProviderAddresses
) public onlyRole(Role.InsuranceCompany) {
    uint planId = nextPlanId++;
    plans[planId].planId = planId;
    plans[planId].planName = _planName;
    plans[planId].companyAddress = msg.sender;
    plans[planId].coverageLimit = _coverageLimit;

    plansByCompany[msg.sender].push(planId);

    // Mark the provided addresses as excluded for this specific plan
    for (uint i = 0; i < _excludedProviderAddresses.length; i++) {
        plans[planId].excludedProviders[_excludedProviderAddresses[i]] = true;
    }

    // **** THIS IS THE MISSING LOOP THAT MUST BE ADDED BACK ****
    // Add selected services to the plan's coverage
    for (uint i = 0; i < _servicesToCover.length; i++) {
        plans[planId].coveredServices[_servicesToCover[i]] = true;
    }

    emit PlanCreated(planId, _planName, msg.sender);
}

    // --- Patient Functions ---
    function enrollInPlan(uint _planId) public onlyRole(Role.Patient) {
        require(plans[_planId].planId != 0, "Plan does not exist");
        PatientEnrollment storage enrollment = patientEnrollments[msg.sender];

        // The core logic change is here. Allow enrollment if:
        // 1. The patient is not currently enrolled in any plan.
        // 2. The patient is switching to a DIFFERENT plan.
        // 3. The patient is re-enrolling in the SAME plan AND their balance is 0.
        require(
            !enrollment.isEnrolled || 
            enrollment.planId != _planId || 
            (enrollment.planId == _planId && enrollment.currentBalance == 0),
            "Cannot re-enroll in a plan that still has a balance."
        );

        // This part remains the same, it simply overwrites the old plan details
        // with the new ones, effectively switching or refilling the plan.
        patientEnrollments[msg.sender] = PatientEnrollment(
            _planId,
            plans[_planId].coverageLimit, // Reset balance to the new plan's limit
            true
        );
        emit PatientEnrolled(msg.sender, _planId);
    }

    // --- Hospital/Clinic/Pharmacy Functions ---
    function provideService(address _patientAddress, string memory _serviceName) public {
        // Allow Hospital, Clinic, or Pharmacy to call this
        require(
            actors[msg.sender].role == Role.Hospital ||
            actors[msg.sender].role == Role.Clinic,
            "Only Hospital or Clinic can provide services"
        );

        PatientEnrollment storage enrollment = patientEnrollments[_patientAddress];
        require(enrollment.isEnrolled, "Patient is not enrolled in any plan");

        Plan storage plan = plans[enrollment.planId];
        require(plan.coveredServices[_serviceName], "Service is not covered by the plan");

        uint cost = serviceCosts[_serviceName];
        require(cost > 0, "Service does not have a valid cost");
        require(enrollment.currentBalance >= cost, "Insufficient balance in plan");

        enrollment.currentBalance -= cost;

        emit ServiceProvided(_patientAddress, msg.sender, _serviceName, cost);
    }

    // This new version processes covered medicines and reports on uncovered ones.
    function provideMedicines(address _patientAddress, string[] memory _medicineNames) public onlyRole(Role.Pharmacy) {
        PatientEnrollment storage enrollment = patientEnrollments[_patientAddress];
        require(enrollment.isEnrolled, "Patient is not enrolled in any plan");

        Plan storage plan = plans[enrollment.planId];
        require(!plan.excludedProviders[msg.sender], "This provider is not covered by the patient's plan.");
        uint totalCost = 0;

        string[] memory uncovered = new string[](_medicineNames.length);
        uint uncoveredCount = 0;
        string[] memory covered = new string[](_medicineNames.length);
        uint coveredCount = 0;

        for (uint i = 0; i < _medicineNames.length; i++) {
            string memory currentItem = _medicineNames[i];
            // Check if the item is covered by the plan AND has a valid cost
            if (plan.coveredServices[currentItem] && serviceCosts[currentItem] > 0) {
                totalCost += serviceCosts[currentItem];
                covered[coveredCount] = currentItem;
                coveredCount++;
            } else {
                uncovered[uncoveredCount] = currentItem;
                uncoveredCount++;
            }
        }

        require(enrollment.currentBalance >= totalCost, "Insufficient balance for covered items");

        if (totalCost > 0) {
            enrollment.currentBalance -= totalCost;
        }

        // Resize arrays to actual counts before emitting
        string[] memory finalUncovered = new string[](uncoveredCount);
        for(uint i = 0; i < uncoveredCount; i++){ finalUncovered[i] = uncovered[i]; }
        string[] memory finalCovered = new string[](coveredCount);
        for(uint i = 0; i < coveredCount; i++){ finalCovered[i] = covered[i]; }

        emit ItemsProcessed(_patientAddress, msg.sender, totalCost, finalCovered, finalUncovered);
    }

    // New function for hospitals/clinics to submit multiple services
    function provideServices(address _patientAddress, string[] memory _serviceNames) public {
         require(
            actors[msg.sender].role == Role.Hospital || actors[msg.sender].role == Role.Clinic,
            "Only Hospital or Clinic can provide services"
        );
        PatientEnrollment storage enrollment = patientEnrollments[_patientAddress];
        require(enrollment.isEnrolled, "Patient is not enrolled in any plan");
        Plan storage plan = plans[enrollment.planId];
        require(!plan.excludedProviders[msg.sender], "This provider is not covered by the patient's plan.");
        uint totalCost = 0;
        string[] memory uncovered = new string[](_serviceNames.length);
        uint uncoveredCount = 0;
        string[] memory covered = new string[](_serviceNames.length);
        uint coveredCount = 0;
        for (uint i = 0; i < _serviceNames.length; i++) {
            string memory currentItem = _serviceNames[i];
            if (plan.coveredServices[currentItem] && serviceCosts[currentItem] > 0) {
                totalCost += serviceCosts[currentItem];
                covered[coveredCount] = currentItem;
                coveredCount++;
            } else {
                uncovered[uncoveredCount] = currentItem;
                uncoveredCount++;
            }
        }
        require(enrollment.currentBalance >= totalCost, "Insufficient balance for covered items");
        if (totalCost > 0) {
            enrollment.currentBalance -= totalCost;
        }
        string[] memory finalUncovered = new string[](uncoveredCount);
        for(uint i = 0; i < uncoveredCount; i++){ finalUncovered[i] = uncovered[i]; }
        string[] memory finalCovered = new string[](coveredCount);
        for(uint i = 0; i < coveredCount; i++){ finalCovered[i] = covered[i]; }
        emit ItemsProcessed(_patientAddress, msg.sender, totalCost, finalCovered, finalUncovered);
    }

    // --- View/Getter Functions (for frontend) ---
    function getActorInfo(address _addr) public view returns (string memory, Role) {
        return (actors[_addr].name, actors[_addr].role);
    }

    function getPlanInfo(uint _planId) public view returns (string memory, address, uint, string memory) {
        Plan storage p = plans[_planId];
        string memory companyName = actors[p.companyAddress].name;
        return (p.planName, p.companyAddress, p.coverageLimit, companyName);
    }

    function getPatientPlan(address _patientAddress) public view returns (uint, uint, bool) {
        PatientEnrollment storage e = patientEnrollments[_patientAddress];
        return (e.planId, e.currentBalance, e.isEnrolled);
    }

    // NEW FUNCTION TO GET COVERED SERVICES
    function getPlanCoveredServices(uint _planId) public view returns (string[] memory) {
        require(plans[_planId].planId != 0, "Plan does not exist");

        string[] memory covered = new string[](predefinedServices.length);
        uint count = 0;

        // Loop through all possible services and check if the plan covers them
        for (uint i = 0; i < predefinedServices.length; i++) {
            if (plans[_planId].coveredServices[predefinedServices[i]]) {
                covered[count] = predefinedServices[i];
                count++;
            }
        }

        // Resize the array to the actual number of covered services
        string[] memory result = new string[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = covered[i];
        }

        return result;
    }

    // ... after constructor() ...

    

    // NEW UNIFIED FUNCTION to allow any authorized actor to add a service or medicine.
    function addPlatformItem(string memory _itemName, uint _cost) public {
        // Check that the caller has an authorized role
        require(
            actors[msg.sender].role == Role.InsuranceCompany ||
            actors[msg.sender].role == Role.Hospital ||
            actors[msg.sender].role == Role.Clinic ||
            actors[msg.sender].role == Role.Pharmacy,
            "Caller is not authorized to add items"
        );

        require(serviceCosts[_itemName] == 0, "Item with this name already exists.");
        require(_cost > 0, "Cost must be greater than zero.");

        predefinedServices.push(_itemName);
        serviceCosts[_itemName] = _cost;
    }

    // NEW GETTER to make fetching all services easier for the frontend
    function getAllServices() public view returns (string[] memory) {
        return predefinedServices;
    }

    // Returns an array of plan IDs created by a specific company
    function getCompanyPlans(address _companyAddress) public view returns (uint[] memory) {
        return plansByCompany[_companyAddress];
    }

    function getAllActorAddresses() public view returns (address[] memory) {
        return registeredActorAddresses;
    }
}