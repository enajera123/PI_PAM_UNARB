export type GeneralInformation = {
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
  
  enum Role {
    Admin,
    User,
  }
  
  enum TypeIdentification {
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
  
  export type User = {
    id: number;
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
  
  export type Participant = {
    id: number;
    firstName: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    identification: string;
    hasWhatsApp: YesOrNo;
    photo?: string;
    grade: Grade;
    typeIdentification: TypeIdentification;
  };
  
  export type MedicalReport = {
    id: number;
    expirationDate: string;
    participant: Participant;
  };
  
  export type Policy = {
    id: number;
    expirationDate: string;
    participant: Participant;
  };
  
  export type ParticipantAttachment = {
    id: number;
    name: string;
    attachmentUrl: string;
    participantId: number;
    participant: Participant;
  };
  
  enum StateParticipantOnCourse {
    Retired,
    Registered,
    Finished,
  }
  
  export type ParticipantOnCourse = {
    participantId: number;
    courseId: number;
    state: StateParticipantOnCourse;
    participant: Participant;
    course: Course;
  };
  
  export type ReferenceContact = {
    id: number;
    firstName: string;
    firstSurname: string;
    secondSurname: string;
    phoneNumber: string;
    relationship: string;
    participantId: number;
    participant: Participant;
  };
  
  export type ParticipantHealth = {
    id: number;
    bloodType: string;
    participantDisseases: ParticipantDissease[];
    participantMedicines: ParticipantMedicine[];
    participantId: number;
    participant: Participant;
  };
  
  export type ParticipantDissease = {
    id: number;
    disease: string;
    description?: string;
    participantHealth: ParticipantHealth;
    participantHealthId: number;
  };
  
  export type ParticipantMedicine = {
    id: number;
    medicine: string;
    description?: string;
    participantHealth: ParticipantHealth;
    participantHealthId: number;
  };
  
  enum YesOrNo {
    Yes,
    No,
  }
  
  export type Course = {
    id: number;
    courseNumber: string;
    initialDate: string;
    finalDate: string;
    name: string;
    location?: string;
    professor: string;
    quota: number;
    description?: string;
    state: State;
    needMedicalReport: YesOrNo;
  };
  