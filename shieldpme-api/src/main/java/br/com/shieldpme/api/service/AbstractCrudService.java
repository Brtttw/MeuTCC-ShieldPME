package br.com.shieldpme.api.service;

import java.lang.reflect.Method;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public abstract class AbstractCrudService<T> {
    protected final JpaRepository<T, Integer> repository;

    protected AbstractCrudService(JpaRepository<T, Integer> repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<T> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public T findById(Integer id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro não encontrado: " + id));
    }

    public T create(T entity) {
        setId(entity, null);
        return repository.save(entity);
    }

    public T update(Integer id, T entity) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Registro não encontrado: " + id);
        }
        setId(entity, id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        T entity = findById(id);
        repository.delete(entity);
    }

    private void setId(T entity, Integer id) {
        try {
            Method setter = entity.getClass().getMethod("setId", Integer.class);
            setter.invoke(entity, id);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("A entidade precisa ter setId(Integer)", e);
        }
    }
}
