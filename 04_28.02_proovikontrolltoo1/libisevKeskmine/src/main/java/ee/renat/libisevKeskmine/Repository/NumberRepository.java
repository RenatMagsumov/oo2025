package ee.renat.libisevKeskmine.Repository;

import ee.renat.libisevKeskmine.Entity.NumberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NumberRepository extends JpaRepository<NumberEntity,Long>
{

}
