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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEvent() { return event; }
    public void setEvent(String event) { this.event = event; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    public Athlete getAthlete() { return athlete; }
    public void setAthlete(Athlete athlete) { this.athlete = athlete; }
}
