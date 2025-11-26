import React, { useEffect, useRef } from "react";
import { Text, View, FlatList } from "react-native";
import useGetAllUser from "@/src/hooks/admin/useGetAllUser";

function Admin() {
    const { error, handleGetAllUser, loading, userData } = useGetAllUser();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            handleGetAllUser();
            hasFetched.current = true;
        }
    }, [handleGetAllUser]);

    const data = Array.isArray(userData) ? userData : [];

    return (
        <View className="flex-1 pt-5 px-2.5" >
            <Text>Lista de Usuários Cadastrados</Text>
            <FlatList
                data={data}
                refreshing
                renderItem={({ item }) => (
                    <ListarUsuario
                        nome={item.nome}
                        email={item.email}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 16, flexGrow: 1 }}
                ListEmptyComponent={!loading ? (
                    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
                        <Text style={{ color: "#6b7280" }}>
                            {error ? String(error) : "Nenhum usuário encontrado."}
                        </Text>
                    </View>
                ) : null}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const ListarUsuario = (props: { nome: string, email: string }) => {
    return (
        <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {props.nome}
            </Text>
            <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                {props.email}
            </Text>
        </View>
    );
}

export default Admin;