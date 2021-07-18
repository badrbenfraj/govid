<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210710225515 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE machine ADD tenant_id INT DEFAULT NULL, ADD reservation_id INT DEFAULT NULL, ADD booked TINYINT(1) NOT NULL, ADD owner_id INT NOT NULL');
        $this->addSql('ALTER TABLE machine ADD CONSTRAINT FK_1505DF849033212A FOREIGN KEY (tenant_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE machine ADD CONSTRAINT FK_1505DF84B83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id)');
        $this->addSql('CREATE INDEX IDX_1505DF849033212A ON machine (tenant_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1505DF84B83297E7 ON machine (reservation_id)');
        $this->addSql('ALTER TABLE reservation ADD machine_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955F6B75B26 FOREIGN KEY (machine_id) REFERENCES machine (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_42C84955F6B75B26 ON reservation (machine_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE machine DROP FOREIGN KEY FK_1505DF849033212A');
        $this->addSql('ALTER TABLE machine DROP FOREIGN KEY FK_1505DF84B83297E7');
        $this->addSql('DROP INDEX IDX_1505DF849033212A ON machine');
        $this->addSql('DROP INDEX UNIQ_1505DF84B83297E7 ON machine');
        $this->addSql('ALTER TABLE machine DROP tenant_id, DROP reservation_id, DROP booked, DROP owner_id');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955F6B75B26');
        $this->addSql('DROP INDEX UNIQ_42C84955F6B75B26 ON reservation');
        $this->addSql('ALTER TABLE reservation DROP machine_id');
    }
}
