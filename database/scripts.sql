-- MySQL Script generated by MySQL Workbench
-- Sun Dec  8 01:00:32 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema sandaugiatructuyen
-- -----------------------------------------------------
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`category` ;

CREATE TABLE IF NOT EXISTS `mydb`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`role` ;

CREATE TABLE IF NOT EXISTS `mydb`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `mydb`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`seller`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`seller` ;

CREATE TABLE IF NOT EXISTS `mydb`.`seller` (
  `id` INT NOT NULL,
  `email` VARCHAR(100) NULL,
  `address` VARCHAR(200) NULL,
  `phone` VARCHAR(45) NULL,
  `id_card_code` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_seller_user1_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_seller_user1`
    FOREIGN KEY (`id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`product` ;

CREATE TABLE IF NOT EXISTS `mydb`.`product` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `seller_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `win_bidder` INT NOT NULL,
  `product_name` VARCHAR(100) NULL,
  `posting_date` DATETIME NULL,
  `ending_date` DATETIME NULL,
  `actual_cost_in_curre` INT NULL,
  `cost_in_buy_imme` INT NULL,
  `description` VARCHAR(2000) NULL,
  `is_auto_extend` TINYINT NULL,
  `step_cost` INT NULL,
  `initial_cost` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_category_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_product_seller1_idx` (`seller_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `mydb`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_seller1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `mydb`.`seller` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`bidder`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`bidder` ;

CREATE TABLE IF NOT EXISTS `mydb`.`bidder` (
  `id` INT NOT NULL,
  `email` VARCHAR(100) NULL,
  `address` VARCHAR(200) NULL,
  `phone` VARCHAR(11) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bidder_user1_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_bidder_user1`
    FOREIGN KEY (`id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`bid_order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`bid_order` ;

CREATE TABLE IF NOT EXISTS `mydb`.`bid_order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT(11) NOT NULL,
  `bidder_id` INT NOT NULL,
  `order_time` DATETIME NULL,
  `order_cost` INT NULL,
  PRIMARY KEY (`id`, `product_id`, `bidder_id`),
  INDEX `fk_bid_order_product1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_bid_order_bidder1_idx` (`bidder_id` ASC) VISIBLE,
  CONSTRAINT `fk_bid_order_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bid_order_bidder1`
    FOREIGN KEY (`bidder_id`)
    REFERENCES `mydb`.`bidder` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`feedback/rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`feedback/rating` ;

CREATE TABLE IF NOT EXISTS `mydb`.`feedback/rating` (
  `content` VARCHAR(200) NULL,
  `rating` TINYINT NULL,
  `bidder_id` INT NOT NULL,
  `seller_id` INT NOT NULL,
  PRIMARY KEY (`bidder_id`, `seller_id`),
  INDEX `fk_feedback/rating_seller1_idx` (`seller_id` ASC) VISIBLE,
  CONSTRAINT `fk_feedback/rating_bidder1`
    FOREIGN KEY (`bidder_id`)
    REFERENCES `mydb`.`bidder` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedback/rating_seller1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `mydb`.`seller` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
