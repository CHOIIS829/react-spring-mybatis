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
    memberNo: number;
    email: string;
    memberName: string;
}
  
export interface MemberState {
    member: Member | null;
    loading: boolean;
    error: string | null;
}
  
  