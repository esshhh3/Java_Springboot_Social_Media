package com.aditya.springbootsocial.controller;

import com.aditya.springbootsocial.config.JwtProvider;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.repository.UserRepo;
import com.aditya.springbootsocial.request.LoginRequest;
import com.aditya.springbootsocial.response.AuthResponse;
import com.aditya.springbootsocial.services.CustomUserDetailsService;
import com.aditya.springbootsocial.services.ServiceInt;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth") // Changed to /api/auth to match frontend and API configuration
public class AuthController {
    @Autowired
    private ServiceInt userServices;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/signup")
    public AuthResponse createUser(@RequestBody User user) {
        // Check if user already exists by email
        Optional<User> userOptional = userRepo.findUserByEmail(user.getEmail());
        if (userOptional.isPresent()){
            throw new IllegalStateException("Email is already present with another account");
        }

        // Create and save new user
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFname(user.getFname());
        newUser.setLname(user.getLname());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setGender(user.getGender());

        User savedUser = userRepo.save(newUser);

        // Create JWT token for the new user
        Authentication authentication = new UsernamePasswordAuthenticationToken(newUser.getEmail(), newUser.getPassword());
        String token = JwtProvider.generateToken(authentication);

        return new AuthResponse(token, "Registration Successful");
    }

    @PostMapping("/signin")
    public AuthResponse signin(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        String token = JwtProvider.generateToken(authentication);

        return new AuthResponse(token, "Signin Successful");
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
        if (userDetails == null) {
            throw new BadCredentialsException("Invalid Email");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Password did not match");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
