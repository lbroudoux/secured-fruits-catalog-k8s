package com.github.lbroudoux.fruits.catalog.domain;

import org.springframework.data.annotation.Id;

public class Fruit {

  @Id
  private String id;

  private String name;
  private String origin;

  public Fruit() {
  }

  public String getId() {
    return this.id;
  }
  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getOrigin() {
    return this.origin;
  }
  public void setOrigin(String origin) {
    this.origin = origin;
  }
}
