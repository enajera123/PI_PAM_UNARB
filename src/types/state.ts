export type UsersState = {
  users: User[];
  currentUser: User | null;
  setUsers: (users: User[]) => void;
  setCurrentUser: (user: User | null) => void;
  getUsers: () => void;
  getUserById: (id: number) => Promise<User | null>;
  getUserByFirstName: (firstname: string) => void;
  postUser: (user: User) => Promise<User | null>;
  putUser: (id: number, user: User) => Promise<User | null>;
  putUserPassword: (id: number, user: User) => void;
  deleteUser: (id: number) => void;
  authenticateUser: (user: User) => void;
};

export type ReferenceContactState = {
  contacts: ReferenceContact[];
  setContacts: (contacts: ReferenceContact[]) => void;
  getContacts: () => void;
  getContactById: (id: number) => void;
  postContact: (contact: ReferenceContact) => Promise<ReferenceContact | null>;
  putContact: (id: number, contact: ReferenceContact) => void;
  deleteContact: (id: number) => void;
  searchContact: (searchTerm: string) => void;
  getContactByParticipantId: (
    participantId: number
  ) => Promise<ReferenceContact | null>;
  putContactByParticipantId: (
    participantId: number,
    contact: ReferenceContact
  ) => Promise<ReferenceContact | null>;
};

export type PolicyState = {
  policys: Policy[];
  setPolicys: (policys: Policy[]) => void;
  getPolicys: () => void;
  getPolicyById: (id: number) => void;
  postPolicy: (policy: Policy) => Promise<Policy | null>;
  putPolicy: (id: number, policy: Policy) => Promise<Policy | null>;
  deletePolicy: (id: number) => void;
};

export type ParticipantState = {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  getParticipants: () => void;
  getParticipantById: (id: number) => Promise<Participant | null>;
  getParticipantByEmail: (email: string) => void;
  getParticipantByIdentification: (identification: string) => void;
  getParticipantByFirstName: (firstName: string) => void;
  postParticipant: (participant: Participant) => Promise<Participant | null>;
  putParticipant: (
    id: number,
    participant: Participant
  ) => Promise<Participant | null>;
  deleteParticipant: (id: number) => void;
};

export type ParticipantOnCourseState = {
  participantsOnCourse: ParticipantOnCourse[];
  setParticipantsOnCourse: (
    participantsOnCourse: ParticipantOnCourse[]
  ) => void;
  getParticipantsOnCourse: () => void;
  getParticipantOnCourseByCourseId: (
    id: number
  ) => Promise<ParticipantOnCourse | null>;
  getParticipantOnCourseByParticipantId: (
    participantId: number
  ) => Promise<ParticipantOnCourse | null>;
  postParticipantOnCourse: (
    participantOnCourse: ParticipantOnCourse
  ) => Promise<ParticipantOnCourse | null>;
  deleteParticipantsOnCourseByCourseId: (courseId: number) => void;
};

export type ParticipantMedicineState = {
  participantsMedicine: ParticipantMedicine[];
  setParticipantsMedicine: (
    participantsMedicine: ParticipantMedicine[]
  ) => void;
  getParticipantsMedicine: () => void;
  getParticipantMedicineById: (id: number) => void;
  getParticipantMedicineByMedicine: (medicine: string) => void;
  getParticipantMedicineByParticipantId: (participantId: number) => void;
  postParticipantMedicine: (
    participantMedicine: ParticipantMedicine
  ) => Promise<ParticipantMedicine | null>;
  putParticipantMedicine: (
    id: number,
    participantMedicine: ParticipantMedicine
  ) => Promise<ParticipantMedicine | null>;
  deleteParticipantMedicine: (id: number) => void;
};

export type ParticipantHealthState = {
  participantsHealth: ParticipantHealth[];
  setParticipantsHealth: (participantsHealth: ParticipantHealth[]) => void;
  getParticipantsHealth: () => void;
  getParticipantHealthById: (id: number) => void;
  getParticipantHealthByBloodType: (bloodType: string) => void;
  getParticipantHealthByParticipantId: (
    participantId: number
  ) => Promise<ParticipantHealth | null>;
  postParticipantHealth: (
    participantHealth: ParticipantHealth
  ) => Promise<ParticipantHealth | null>;
  putParticipantHealth: (
    id: number,
    participantHealth: ParticipantHealth
  ) => void;
  deleteParticipantHealth: (id: number) => void;
  putParticipantHealthByParticipantId: (
    id: number,
    participantHealth: ParticipantHealth
  ) => Promise<ParticipantHealth | null>;
};

export type ParticipantDisseaseState = {
  participantsDisease: ParticipantDissease[];
  setParticipantsDisease: (participantsDisease: ParticipantDissease[]) => void;
  getParticipantsDisease: () => void;
  getParticipantDiseaseById: (id: number) => void;
  getParticipantDiseaseByDisease: (disease: string) => void;
  getParticipantDiseaseByParticipantHealthtId: (
    participantHealthId: number
  ) => Promise<ParticipantDissease | null>;
  postParticipantDisease: (
    participantDisease: ParticipantDissease
  ) => Promise<ParticipantDissease | null>;
  putParticipantDisease: (
    id: number,
    participantDisease: ParticipantDissease
  ) => Promise<ParticipantDissease | null>;
  deleteParticipantDisease: (id: number) => void;
};

export type ParticipantAttachmentState = {
  participantsAttachment: ParticipantAttachment[];
  setParticipantsAttachment: (
    participantsAttachment: ParticipantAttachment[]
  ) => void;
  getParticipantsAttachment: () => void;
  getParticipantAttachmentById: (
    id: number
  ) => Promise<ParticipantAttachment | null>;
  getParticipantAttachmentByParticipantId: (
    participantId: number
  ) => Promise<ParticipantAttachment | null>;
  postParticipantAttachment: (
    participantAttachment: ParticipantAttachment
  ) => Promise<ParticipantAttachment | null>;
  putParticipantAttachment: (
    id: number,
    participantAttachment: ParticipantAttachment
  ) => Promise<ParticipantAttachment | null>;
  deleteParticipantAttachment: (id: number) => void;
};

export type MedicalReportState = {
  reports: MedicalReport[];
  setReports: (reports: MedicalReport[]) => void;
  getMedicalReports: () => void;
  getMedicalReportById: (id: number) => Promise<MedicalReport | null>;
  postMedicalReport: (report: MedicalReport) => Promise<MedicalReport | null>;
  putMedicalReport: (
    id: number,
    report: MedicalReport
  ) => Promise<MedicalReport | null>;
  deleteMedicalReport: (id: number) => void;
};

export type GeneralInformationState = {
  information: GeneralInformation[];
  setGeneralInformation: (information: GeneralInformation[]) => void;
  getGeneralInformation: () => void;
  getGeneralInformationById: (id: number) => void;
  postGeneralInformation: (information: GeneralInformation) => void;
  putGeneralInformation: (id: number, information: GeneralInformation) => void;
  deleteGeneralInformation: (id: number) => void;
};

export type CoursesState = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  getCourses: () => void;
  getCourseById: (id: number) => Promise<Course | null>;
  getCourseByCourseNumber: (courseNumber: string) => void;
  getCourseByName: (name: string) => void;
  postCourse: (courses: Course) => Promise<Course | null>;
  putCourse: (id: number, courses: Course) => Promise<Course | null>;
  deleteCourse: (id: number) => void;
};
