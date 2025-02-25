package ee.renat.kymnevoistlus.repository;

import ee.renat.kymnevoistlus.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AthleteRepository extends JpaRepository<Athlete,Long>
{

}
