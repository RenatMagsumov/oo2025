package ee.Renat.proovikontrolltoo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Sona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sona;
    private String tahendus;

    @ManyToOne
    @JoinColumn(name = "haldaja_id")
    private Haldaja haldaja;
}
