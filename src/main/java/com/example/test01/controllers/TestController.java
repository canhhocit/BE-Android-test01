package com.example.test01.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.test01.models.User;
import com.example.test01.repositories.UserRepository;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@CrossOrigin(origins = "*") // Cho phép CORS để gọi từ web
@RequestMapping("/api/users")
public class TestController {

    @Autowired
    private UserRepository userRepo;

    // CREATE 
    @PostMapping
    public User create(@RequestBody User user){
        return userRepo.save(user);
    }

    // READ
    @GetMapping
    public List<User> getAll(){
        return userRepo.findAll();
    }

    // READ - theo ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id){
        return userRepo.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }
    // READ - theo name
    @GetMapping("/name/{username}")
    public ResponseEntity<User> getByUserName(@PathVariable String username){
        return userRepo.findByUsername(username)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE 
    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User userDetails){
        return userRepo.findById(id)
            .map(user -> {
                user.setUsername(userDetails.getUsername());
                user.setAge(userDetails.getAge());
                User updatedUser = userRepo.save(user);
                return ResponseEntity.ok(updatedUser);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // DELETE 
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        if(userRepo.existsById(id)){
            userRepo.deleteById(id);
            return ResponseEntity.ok("Đã xóa user ID: " + id);
        }
        return ResponseEntity.notFound().build();
    }
}