package ee.renat.kontrolltoo.repository;

import ee.renat.kontrolltoo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
