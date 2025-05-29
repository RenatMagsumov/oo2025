package ee.renat.kontrolltoo.controller;

import ee.renat.kontrolltoo.entity.Album;
import ee.renat.kontrolltoo.entity.Comment;
import ee.renat.kontrolltoo.repository.AlbumRepository;
import ee.renat.kontrolltoo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @PostMapping("/{albumId}")
    public Comment addCommentToAlbum(@PathVariable Long albumId, @RequestBody Comment comment) {
        Optional<Album> album = albumRepository.findById(albumId);
        album.ifPresent(comment::setAlbum);
        return commentRepository.save(comment);
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment updatedComment) {
        return commentRepository.findById(id)
                .map(comment -> {
                    comment.setContent(updatedComment.getContent());
                    return commentRepository.save(comment);
                })
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }
}
