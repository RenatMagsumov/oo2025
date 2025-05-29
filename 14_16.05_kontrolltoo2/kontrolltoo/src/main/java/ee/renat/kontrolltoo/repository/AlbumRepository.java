package ee.renat.kontrolltoo.repository;

import ee.renat.kontrolltoo.entity.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    Page<Album> findByUserId(Long userId, Pageable pageable);
}
