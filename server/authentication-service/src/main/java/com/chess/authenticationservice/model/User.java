package com.chess.authenticationservice.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@Table(name = "users")
public class User extends BaseEntity {

    @NotEmpty(message = "Name cannot be empty.")
    @Column(nullable = false, unique = true)
    private String login;

    @Email(message = "Email must be valid.")
    @Column(nullable = false, unique = true)
    private String email;

    @NotEmpty
    private String password;

}
