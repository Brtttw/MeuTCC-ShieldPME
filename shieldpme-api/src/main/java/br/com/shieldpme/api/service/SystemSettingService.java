package br.com.shieldpme.api.service;

import br.com.shieldpme.api.entity.SystemSetting;
import br.com.shieldpme.api.repository.SystemSettingsRepository;
import org.springframework.stereotype.Service;

@Service
public class SystemSettingService extends AbstractCrudService<SystemSetting> {
    public SystemSettingService(SystemSettingsRepository repository) {
        super(repository);
    }
}
