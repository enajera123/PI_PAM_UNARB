interface GeneralInformation {
    id: number;
    name: string;
    vision: string;
    mission: string;
    description: string;
    image: string;
};

enum State {
    Active,
    Inactive,
}

interface User {
    id?: number;
    firstName: string;
    firstSurname: string;
    secondSurname: string;
    phoneNumber: string;
    birthDate: string;
    identification: string;
    state: State;
    email: string;
    password: string;
    role: Role;
};

enum Role {
    Admin,
    User,
}

enum interfaceIdentification {
    Nacional,
    DIMEX,
}

enum Grade {
    Sin_Estudio,
    Primaria_Completa,
    Primaria_Incompleta,
    Secundaria_Completa,
    Secundaria_Incompleta,
    Universidad_Incompleta,
    Universidad_Completa,
}

interface Participant {
    id: number;
    firstName: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    identification: string;
    hasWhatsApp: YesOrNo;
    photo: string | null;
    grade: Grade;
    Policy: Policy | null;
    MedicalReport: MedicalReport | null;
    ReferenceContacts: ReferenceContact[];
    ParticipantAttachments: ParticipantAttachment[];
    interfaceIdentification: interfaceIdentification;
    ParticipantHealths: ParticipantHealth | null;
    ParticipantsOnCourses: ParticipantOnCourse[];
};

interface MedicalReport {
    id: number;
    expirationDate: string;
    participant: Participant;
};

interface Policy {
    id: number;
    expirationDate: string;
    participant: Participant;
};

interface ParticipantAttachment {
    id: number;
    name: string;
    attachmentUrl: string;
    participantId: number;
    Participant: Participant;
};

enum StateParticipantOnCourse {
    NoRegistered,
    Registered,
}

interface ParticipantOnCourse {
    participantId: number;
    courseId: number;
    state: StateParticipantOnCourse;
    Participants: Participant;
    Courses: Course;
};

interface ReferenceContact {
    id?: number;
    firstName: string;
    firstSurname: string;
    phoneNumber: string;
    relationship: string;
    secondFirstName: string;
    secondFirstSurname: string;
    secondPhoneNumber: string;
    secondRelationship: string;
    participantId: number;
    Participant?: Participant;
};

interface ParticipantHealth {
    id?: number;
    bloodType: string;
    ParticipantDisseases?: ParticipantDissease[];
    ParticipantMedicines?: ParticipantMedicine[];
    participantId: number;
    Participant?: Participant;
};

interface ParticipantDissease {
    id?: number;
    disease: string;
    description: string | null;
    ParticipantHealth?: ParticipantHealth;
    participantHealthId: number;
};

interface ParticipantMedicine {
    id?: number;
    medicine: string;
    description: string | null;
    ParticipantHealth: ParticipantHealth;
    participantHealthId: number;
};

enum YesOrNo {
    Yes,
    No,
}

interface Course {
    id?: number;
    courseNumber: string;
    initialDate: string;
    finalDate: string;
    name: string;
    location: string | null;
    professor: string;
    quota: number;
    description: string | null;
    state: State;
    needMedicalReport: YesOrNo;
    ParticipantsOnCourses?: ParticipantOnCourse[];
};