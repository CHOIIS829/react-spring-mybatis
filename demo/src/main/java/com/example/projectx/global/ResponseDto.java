package com.example.projectx.global;

import lombok.*;

@Getter
@Setter
@Builder
public class ResponseDto<T> {
    private boolean success;
    private T data;
    private String message;
}
