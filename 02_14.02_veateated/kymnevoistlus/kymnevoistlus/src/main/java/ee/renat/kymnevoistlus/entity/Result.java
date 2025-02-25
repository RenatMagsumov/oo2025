package ee.renat.kymnevoistlus.entity;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String event; // spordiala nimetus
    private double score;

    @ManyToOne
    @JoinColumn(name = "athlete_id")
    private Athlete athlete;
}
