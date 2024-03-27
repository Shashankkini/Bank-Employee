package com.javaguides.springboot.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.javaguides.springboot.exception.ResourceNotFoundException;
import com.javaguides.springboot.model.Employee;
import com.javaguides.springboot.repository.EmployeeRepository;
import com.javaguides.springboot.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService{

	private EmployeeRepository employeeRepository;
	public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
		super();
		this.employeeRepository = employeeRepository;
	}
	@Override
	public Employee saveEmployee(Employee employee) {
		// TODO Auto-generated method stub
		return employeeRepository.save(employee);
	}
	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}
	@Override
	public Employee getEmployeeById(long id) {
		// TODO Auto-generated method stub
		Optional<Employee> employee=employeeRepository.findById(id);
		if(employee.isPresent()) {
			return employee.get();
		}
		else
			throw new ResourceNotFoundException("Employee","Id",id);
	}
	@Override
	public Employee updateEmployee(Employee employee, long id) {
		//check whether id is present or not
		Employee existingEmployee=employeeRepository.findById(id).orElseThrow(
				()->new ResourceNotFoundException("Employee","Id",id));
		
		existingEmployee.setFirstName(employee.getFirstName());
		existingEmployee.setLastName(employee.getLastName());
		existingEmployee.setEmail(employee.getEmail());
		existingEmployee.setPhNo(employee.getPhNo());
		//save existing employee to DB
		return employeeRepository.save(existingEmployee);
		//return existingEmployee;
		
		
	

}
	
	//deleting by id
	@Override
	public void deleteEmployee(long id) {
		// check whether employee exist
		
		employeeRepository.findById(id).orElseThrow(
				()->new ResourceNotFoundException("Employee","Id",id));
		
		
		employeeRepository.deleteById(id);
	}
}
