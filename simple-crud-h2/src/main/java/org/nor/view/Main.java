package org.nor.view;

import java.util.List;
import java.util.stream.Stream;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	CommandLineRunner start(TaskRepository ts) {
		return args -> {
			Stream.of(new Task(0, "tt1"), new Task(0, "tu2"), new Task(0, "et3")).forEach(t -> {
				ts.save(t);
				System.out.println(t);
			});
		};
	}
}

interface TaskRepository extends JpaRepository<Task, Integer> {

}

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String taskName;
}

@CrossOrigin("*")
@RestController
class Controller {
	@Autowired
	private TaskRepository ts;
	@Value("${server.port}")
	private String port;

	@GetMapping("/tasks")
	public List<Task> getTasks() {
		return ts.findAll();
	}

	@GetMapping("/tasks/{id}")
	public Task getTask(@PathVariable(name = "id") Integer code) {
		return ts.findById(code).get();
	}

	@PostMapping("/tasks")
	public Task save(@RequestBody Task task) {
		return ts.save(task);
	}

	@PutMapping("/tasks/{id}")
	public Task update(@PathVariable(name = "id") Integer code, @RequestBody Task task) {
		task.setId(code);
		return ts.save(task);
	}

	@DeleteMapping("/tasks/{id}")
	public void delete(@PathVariable(name = "id") Integer code) {
		ts.deleteById(code);
	}

	@GetMapping("/")
	public String getHome() {
		return "<h1>salamo alaykom</h1><a href='http://localhost:" + port + "/tasks'>tasks</a>";
	}
}