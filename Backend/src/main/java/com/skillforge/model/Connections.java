package com.skillforge.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.ManyToAny;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Connections {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id ;
	@ManyToOne(fetch = FetchType.EAGER)
private User sender;
	@ManyToOne(fetch = FetchType.EAGER)
private User receiver;
private LocalDateTime createdAt;
private ConnectionStatus status;
}
