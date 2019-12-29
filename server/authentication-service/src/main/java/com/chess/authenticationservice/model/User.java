package com.chess.authenticationservice.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "user")
public class User extends BaseEntity {

    @NotEmpty
    @Column(nullable = false, unique = true)
    private String login;

    @NotEmpty
    @Column(nullable = false, unique = true)
    private String email;

    @NotEmpty
    private String password;

}
