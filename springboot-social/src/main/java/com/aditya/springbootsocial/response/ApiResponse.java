package com.aditya.springbootsocial.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private String message;
    private Boolean status;
}
