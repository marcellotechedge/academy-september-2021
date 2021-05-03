package academy.receiver.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import academy.receiver.handler.DataHandler;

import org.springframework.amqp.core.Queue;

@Configuration
public class AmqpConfig {

	Logger logger = LoggerFactory.getLogger(AmqpConfig.class);

	@Value("${spring.rabbitmq.host}")
	private String rabbitHost;

	@Value("${spring.rabbitmq.port}")
	private Integer rabbitPort;

	@Value("${spring.rabbitmq.username}")
	private String rabbitUser;

	@Value("${spring.rabbitmq.password}")
	private String rabbitPassword;

	@Value("${spring.rabbitmq.virtual-host}")
	private String virtualHost;

	@Value("${upload.queue.name}")
	private String uploadQueueName;

	@Bean
	public ConnectionFactory connectionFactory() {
		CachingConnectionFactory connectionFactory = new CachingConnectionFactory(rabbitHost, rabbitPort);
		connectionFactory.setUsername(rabbitUser);
		connectionFactory.setPassword(rabbitPassword);
		connectionFactory.setVirtualHost(virtualHost);
		logger.info("Creating connection factory with: " + rabbitUser + "@" + rabbitHost + ":" + rabbitPort
				+ " virtualHost:" + virtualHost);

		return connectionFactory;
	}

	@Bean
	Queue uploadQueue() {
		logger.info("uploadQueue called:" + uploadQueueName);
		return new Queue(uploadQueueName);
	}

	@Bean
	public Jackson2JsonMessageConverter jsonMessageConverter() {
		return new Jackson2JsonMessageConverter();
	}

	@Bean
	MessageListenerAdapter listenerAdapter(DataHandler receiver) {
		MessageListenerAdapter l= new MessageListenerAdapter(receiver, "receiveMessage");
		l.setMessageConverter(jsonMessageConverter());
		return l;
	}

	@Bean
	SimpleMessageListenerContainer container(ConnectionFactory connectionFactory,
			MessageListenerAdapter listenerAdapter) {
		SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
		container.setConnectionFactory(connectionFactory);
		container.setQueueNames(uploadQueueName);
		container.setMessageListener(listenerAdapter);
		
		return container;
	}

}