package com.example.projectx.common;

import lombok.*;

@Getter
@Setter
public class ResponseDto<T> {
    private boolean success;
    private T data;
    private String message;
}
