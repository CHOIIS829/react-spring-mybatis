package com.example.projectx.member.mapper;

import com.example.projectx.member.vo.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface MemberMapper {

    int insertMember(Member member);
    Member findMember(String email);
    ArrayList<Member> findAllMembers();
}
