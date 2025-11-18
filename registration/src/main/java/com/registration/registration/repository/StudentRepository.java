package com.registration.registration.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.registration.registration.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

}
