package com.registration.registration.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.registration.registration.model.Student;
import com.registration.registration.repository.StudentRepository;

@RestController
@CrossOrigin("*")   // frontend ke liye important
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // Save student
    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // Get all students
    @GetMapping("/all")
    public java.util.List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
}
