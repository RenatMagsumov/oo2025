package ee.renat.kontrolltoo.controller;

import ee.renat.kontrolltoo.entity.Album;
import ee.renat.kontrolltoo.entity.User;
import ee.renat.kontrolltoo.repository.AlbumRepository;
import ee.renat.kontrolltoo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Исправленный метод для POST-запроса
    @PostMapping(consumes = "application/json", produces = "application/json")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/{id}/albums")
    public Page<Album> getAlbumsByUser(@PathVariable Long id,
                                       @RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return albumRepository.findByUserId(id, pageable);
    }
}
