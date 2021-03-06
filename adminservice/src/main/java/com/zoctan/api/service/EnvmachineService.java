package com.zoctan.api.service;

import com.zoctan.api.entity.Envmachine;
import com.zoctan.api.core.service.Service;

import java.util.List;
import java.util.Map;

/**
* @author Zoctan
* @date 2020/05/21
*/
public interface EnvmachineService extends Service<Envmachine> {
    /**
     * 获取环境服务器
     *
     * @return 环境服务器列表
     */
    List<Envmachine> listAllEnvAndMac();


    /**
     * 按环境名或者服务器名获取环境服务器内容
     *
     * @param params 参数
     * @return 环境服务器列表
     */
    List<Envmachine> findEnvAndMacWithName(final Map<String, Object> params);

    /**
     * 更新环境服务器内容
     *
     * @param params 参数
     * @return 环境服务器列表
     */
    void updateEnvAndMac(Envmachine params);

}
