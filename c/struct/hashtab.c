#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct nlist
{
    struct nlist *next;
    char *name;
    char *defn;
};

#define HASHSIZE 101
static struct nlist *hashtab[HASHSIZE];

unsigned hash(char *s)
{
    unsigned hashval;
    for (hashval = 0; *s != '\0'; s++)
    {
        hashval = *s + hashval * 31;
    }

    return hashval % HASHSIZE;
}

struct nlist *lookup(char *s)
{
    struct nlist *np;
    for (np = hashtab[hash(s)]; np != NULL; np = np->next)
    {
        if (strcmp(s, np->name) == 0)
            return np;
    }

    return NULL;
}

struct nlist *install(char *name, char *defn)
{
    struct nlist *np;
    unsigned hashval;
    if ((np = lookup(name)) == NULL)
    {
        np = (struct nlist *)malloc(sizeof(*np));
        if (np == NULL || (np->name = strdup(name) == NULL))
        {
            return NULL;
        }

        hashval = hash(name);
        np->next = hashtab[hashval];
        hashtab[hashval] = np;
    }
    else
    {
        free((void *)np->defn);
    }

    if ((np->defn = strdup(defn)) == NULL)
    {
        return NULL;
    }

    return np;
}

void undef(char *s)
{
    unsigned index = hash(s);
    struct nlist *np = hashtab[index];
    struct nlist *pre_np;
    struct nlist *next;

    for (; np != NULL; pre_np = np, np = np->next)
    {
        if (strcmp(s, np->name) != 0)
            continue;

        next = np->next;
        free((void *)np->defn);
        free((void *)np->name);
        free((void *)np);

        if(next == NULL)
            return;
        
        if(pre_np == NULL)
            hashtab[index] = next;
        else
            pre_np->next = next;
    }
}