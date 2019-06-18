package com.github.lbroudoux.fruits.catalog.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.annotation.Timed;

import com.github.lbroudoux.fruits.catalog.domain.Fruit;
import com.github.lbroudoux.fruits.catalog.repository.FruitRepository;

@RestController
public class FruitController {

  @Autowired
  private FruitRepository repository;

  @RequestMapping(value = "/api/fruits", method = RequestMethod.GET)
  public List<Fruit> listFruits() {
    return repository.findAll();
  }

  @RequestMapping(value = "/api/fruits", method = RequestMethod.POST)
  public ResponseEntity<Fruit> createFruit(@RequestBody Fruit fruit) {
    return new ResponseEntity<>(repository.save(fruit), HttpStatus.CREATED);
  }
}
