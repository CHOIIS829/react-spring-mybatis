export interface JoinRequest {
    email: string;
    memberPwd: string;
    memberName: string;
}

export interface JoinResponse {
    data: {
        email: string;
        memberName: string;
        memberNo: number;
    };
    message: string;
    success: boolean;
}


export interface loginRequest{
    email: string;
    memberPwd: string;
}

export interface Member {
    id: number;
    name: string;
    email: string;
}
  
  // Define a type for the slice state
export interface MemberState {
    member: Member | null;
    loading: boolean;
    error: string | null;
}
  
