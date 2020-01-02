package com.chess.historyservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@EmbeddedKafka(topics = "game",
        bootstrapServersProperty = "spring.kafka.bootstrap-servers")
@DirtiesContext
@ActiveProfiles("test")
class HistoryServiceApplicationTests {

    @Test
    void contextLoads() {
    }

}
