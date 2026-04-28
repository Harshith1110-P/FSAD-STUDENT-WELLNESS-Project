package com.studenthealth.my_wellness_app.service;

import com.studenthealth.my_wellness_app.dto.UserDto;
import com.studenthealth.my_wellness_app.model.User;

public interface UserService {
    User register(UserDto userDto);
    User findByEmail(String email);
    boolean existsByEmail(String email);
}