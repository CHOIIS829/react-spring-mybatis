package com.example.projectx.domain.member.service;


import com.example.projectx.domain.member.dto.CareerDTO;
import com.example.projectx.domain.member.dto.EducationDTO;
import com.example.projectx.domain.member.dto.MemberDTO;
import com.example.projectx.domain.member.dto.MemberSimpleListDTO;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${spring.upload.path}")
    private String uploadPath;

    @Transactional
    public Member signup(MemberDTO requestMember) {

        if(memberRepository.existsByEmail(requestMember.getEmail())){
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        Member member = Member.builder()
                .email(requestMember.getEmail())
                .memberPwd(bCryptPasswordEncoder.encode(requestMember.getMemberPwd()))
                .memberName(requestMember.getMemberName())
                .role("ROLE_USER")
                .build();

        return memberRepository.save(member);
    }

    @Transactional
    public MemberDTO insertPrivacy(MemberDTO requestMember) {

        //Member findMember = memberRepository.findMemberWithEducationsAndCareersByEmail(requestMember.getEmail());
        Member findMember = memberRepository.findByEmail(requestMember.getEmail());

        if(findMember == null){
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }

        findMember.updatePrivacy(
                requestMember.getPhone(),
                requestMember.getBirthDate(),
                requestMember.getIntroduction(),
                requestMember.getGitAddress()
        );

        requestMember.getEducations().stream() //
                .map(EducationDTO::toEntity)
                .forEach(findMember::addEducation);

        requestMember.getCareers().stream()
                .map(CareerDTO::toEntity)
                .forEach(findMember::addCareer);

        Member responseMember = memberRepository.findByMemberWithEducationsAndCareersByEmail(requestMember.getEmail());

        return MemberDTO.toDTO(responseMember);
    }

    @Transactional
    public String profile(MultipartFile file, String email) {
        try {
            // 파일 유효성 체크
            if (file.isEmpty()) {
                throw new IllegalArgumentException("파일이 비어있습니다.");
            } else if (!file.getContentType().startsWith("image")) {
                throw new IllegalArgumentException("이미지 파일만 업로드 가능합니다.");
            } else if (file.getSize() > 10 * 1024 * 1024) {
                throw new IllegalArgumentException("파일 크기는 10MB를 넘을 수 없습니다.");
            }

            // 이미 저장된 파일 삭제
            Member findmember = memberRepository.findByEmail(email);

            String profileImg = findmember.getProfileImg();

            if (profileImg != null) {
                Path deletePath = Paths.get(uploadPath, profileImg.replace("src/main/resources/upload/profile/", ""));
                if (Files.exists(deletePath)) {
                    Files.delete(deletePath);
                }
            }

            // 파일 저장
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadPath, fileName);

            if (!Files.exists(filePath.getParent())) {
                Files.createDirectories(filePath.getParent());
            }

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String url = "src/main/resources/upload/profile/" + fileName;

            findmember.updateProfileImg(url);

            return url;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("프로필 사진 업로드에 실패했습니다.");
        }
    }

    @Transactional
    public void deleteProfile(String email) {
        try{
            Member findMember = memberRepository.findByEmail(email);
            String profileImg = findMember.getProfileImg();
            if (profileImg != null) {
                Path deletePath = Paths.get(uploadPath, profileImg.replace("src/main/resources/upload/profile/", ""));
                if (Files.exists(deletePath)) {
                    Files.delete(deletePath);
                }
            }
            findMember.updateProfileImg(null);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("프로필 사진 삭제에 실패했습니다.");
        }
    }

    @Transactional
    public void deleteMember(String email) {
        try{
            Member findMember = memberRepository.findByEmail(email);
            memberRepository.deleteByEmail(email);
            String profileImg = findMember.getProfileImg();
            if (profileImg != null) {
                Path deletePath = Paths.get(uploadPath, profileImg.replace("src/main/resources/upload/profile/", ""));
                if (Files.exists(deletePath)) {
                    Files.delete(deletePath);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("회원탈퇴에 실패했습니다.");
        }
    }

    public Page<MemberSimpleListDTO> findMembers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "memberNo");

        Page<MemberSimpleListDTO> members = memberRepository.findMembers(pageable);

        return members;
    }

    public MemberDTO findMember(String email) {
        Member member = memberRepository.findByMemberWithEducationsAndCareersByEmail(email);

        if(member == null){
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }

        return MemberDTO.toDTO(member);
    }

    public String findEmail(String name, String phone) {
        Member member = memberRepository.findByMemberNameAndPhone(name, phone);

        if(member == null){
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }

        return member.getEmail();
    }
}
