package academy.receiver;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;


@SpringBootTest
@ActiveProfiles("unit-test")
class LoaderApplicationTests {

	@Test
	void contextLoads() {
	}
	


	
	@Test
	public void test() {
		assertTrue(true);
	}
	
	
}
