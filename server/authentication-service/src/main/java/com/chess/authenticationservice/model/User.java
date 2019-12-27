package com.chess.authenticationservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty( value = "password", access = JsonProperty.Access.WRITE_ONLY)
    @NotEmpty
    private String password;
}
