package ee.renat.kontrolltoo.controller;

import ee.renat.kontrolltoo.entity.Album;
import ee.renat.kontrolltoo.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/albums")
@CrossOrigin(origins = "*")
public class AlbumController {

    @Autowired
    private AlbumRepository albumRepository;

    @GetMapping
    public Page<Album> getAllAlbums(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return albumRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Album getAlbumById(@PathVariable Long id) {
        return albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album not found"));
    }

    @PostMapping
    public Album createAlbum(@RequestBody Album album) {
        return albumRepository.save(album);
    }

    @PutMapping("/{id}")
    public Album updateAlbum(@PathVariable Long id, @RequestBody Album albumDetails) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album not found"));

        album.setTitle(albumDetails.getTitle());
        album.setUser(albumDetails.getUser());
        return albumRepository.save(album);
    }

    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Long id) {
        albumRepository.deleteById(id);
    }
}
