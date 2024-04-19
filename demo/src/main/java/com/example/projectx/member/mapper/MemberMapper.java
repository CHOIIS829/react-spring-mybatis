package com.example.projectx.member.mapper;

import com.example.projectx.member.vo.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.Map;

@Mapper
public interface MemberMapper {

    int insertMember(Member member);
    Member findMember(String email);
    ArrayList<Member> findAllMembers();
    Member login(Map<String, String> loginInfo);
}
