package ee.renat.kontrolltoo.repository;

import ee.renat.kontrolltoo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
