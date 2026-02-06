package com.example.test01.controllers;


import org.springframework.web.bind.annotation.RestController;

import com.example.test01.models.User;
import com.example.test01.repositories.UserRepository;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
// @Controller
// @ResponseBody
@RequestMapping("api/users")
public class TestController {

    private UserRepository userRepo;

    @GetMapping("/{id}")
    public User getName(@PathVariable Long id){
        return userRepo.findById(id).orElseThrow( ()-> new RuntimeException("user not found") );
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        userRepo.deleteById(id);
        return "deleted !";
    }
    @GetMapping
    public List<User> getList(){
        return userRepo.findAll();
    }

    @PostMapping
    public User insert(@RequestBody User user){
        return userRepo.save(user);
    }

    
}

