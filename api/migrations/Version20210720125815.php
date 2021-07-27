<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210720125815 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE reservation (id INT AUTO_INCREMENT NOT NULL, machine_id INT NOT NULL, user_id INT NOT NULL, date_from DATE NOT NULL, date_to DATE NOT NULL, UNIQUE INDEX UNIQ_42C84955F6B75B26 (machine_id), UNIQUE INDEX UNIQ_42C84955A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955F6B75B26 FOREIGN KEY (machine_id) REFERENCES machine (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE laboratoire ADD total_reviews INT NOT NULL');
        $this->addSql('ALTER TABLE machine ADD tenant_id INT DEFAULT NULL, ADD reservation_id INT DEFAULT NULL, ADD booked TINYINT(1) NOT NULL, ADD owner_id INT NOT NULL');
        $this->addSql('ALTER TABLE machine ADD CONSTRAINT FK_1505DF849033212A FOREIGN KEY (tenant_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE machine ADD CONSTRAINT FK_1505DF84B83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id)');
        $this->addSql('CREATE INDEX IDX_1505DF849033212A ON machine (tenant_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1505DF84B83297E7 ON machine (reservation_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE machine DROP FOREIGN KEY FK_1505DF84B83297E7');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('ALTER TABLE laboratoire DROP total_reviews');
        $this->addSql('ALTER TABLE machine DROP FOREIGN KEY FK_1505DF849033212A');
        $this->addSql('DROP INDEX IDX_1505DF849033212A ON machine');
        $this->addSql('DROP INDEX UNIQ_1505DF84B83297E7 ON machine');
        $this->addSql('ALTER TABLE machine DROP tenant_id, DROP reservation_id, DROP booked, DROP owner_id');
    }
}
