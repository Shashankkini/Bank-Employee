package com.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.javaguides.springboot.model.Employee;
import com.javaguides.springboot.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("http://localhost:4200/")
public class EmployeeController {

	private EmployeeService employeeService;

	public EmployeeController(EmployeeService employeeService) {
		super();
		this.employeeService = employeeService;
	}
	
	//build create REST API
	@PostMapping
	public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee){
		return new ResponseEntity<Employee>(employeeService.saveEmployee(employee),HttpStatus.CREATED);
	}
	
	//build get all employees REST API
	@GetMapping
	public List<Employee>getEmployees(){
		return employeeService.getAllEmployees();
	}
	
	
	//build get employee by id 
	//http://localhost:8080/api/employees/1
	@GetMapping("/{id}/getElements")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id")long id){
		return new ResponseEntity<Employee>(employeeService.getEmployeeById(id),HttpStatus.OK);
	}
	//build update employee
		@PostMapping("{id}")
		public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long id,
				@RequestBody Employee employee){
			return new ResponseEntity<Employee>(employeeService.updateEmployee(employee,id),HttpStatus.OK);
		}
	
	//build delete Employee
//		@GetMapping("/{id}")
//		@ResponseBody
//		public ResponseEntity<String> deleteEmployee(@PathVariable("id") long id) {
//			employeeService.deleteEmployee(id);
//			return new ResponseEntity<String> ("Employee Deleted Successfully!",HttpStatus.OK);
//		}
	
		
		@GetMapping("/{id}")
		public ResponseEntity<Map<String, String>> deleteById(@PathVariable("id") long id) {
		    try {
		    	employeeService.deleteEmployee(id);
		        Map<String, String> response = new HashMap<>();
		        response.put("message", "Account Deleted Successfully");
		        return new ResponseEntity<>(response, HttpStatus.OK);
		    } catch (Exception e) {
		        Map<String, String> errorResponse = new HashMap<>();
		        errorResponse.put("error", "Error deleting entity: " + e.getMessage());
		        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		}
}
