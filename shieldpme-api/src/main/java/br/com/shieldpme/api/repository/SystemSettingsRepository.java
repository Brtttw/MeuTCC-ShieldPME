package br.com.shieldpme.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.shieldpme.api.entity.SystemSetting;

@Repository 
public interface SystemSettingsRepository 
	extends JpaRepository<SystemSetting, Integer> {

    Optional<SystemSetting> findBySettingKey(String settingKey);
}
