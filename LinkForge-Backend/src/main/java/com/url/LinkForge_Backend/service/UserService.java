package com.url.LinkForge_Backend.service;

import com.url.LinkForge_Backend.model.User;
import com.url.LinkForge_Backend.model.UserPrincipal;
import com.url.LinkForge_Backend.repository.UrlMappingRepository;
import com.url.LinkForge_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UrlMappingRepository urlMappingRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    public void register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public String login(User user) {
        Authentication authentication=authenticationManager.
                authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        }
        return "Invalid creditals";
    }

    public User findByUserName(String name) throws UsernameNotFoundException {
        return userRepository.findByUsername(name);
    }
}
