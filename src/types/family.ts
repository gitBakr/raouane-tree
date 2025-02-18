
export interface FamilyMember {
  id: string;
  name: string;
  birthDate: string;
  photo?: string;
  anecdotes?: string[];
  parentIds: string[];
  childrenIds: string[];
  relationship: string;
}

export interface FamilyTree {
  members: FamilyMember[];
  rootId: string;
}
